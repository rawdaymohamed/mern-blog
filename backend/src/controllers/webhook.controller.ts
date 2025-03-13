import { Request, Response } from "express";
import { Webhook } from "svix";
import { User } from "../models/user.model";
export const clerkWebHook = async (req: Request, res: Response) => {

    // This is a generic method to parse the contents of the payload.
    // Depending on the framework, packages, and configuration, this may be
    // different or not required.

    const SIGNING_SECRET = process.env.CLERK_WEBHOOK_SECRET

    if (!SIGNING_SECRET) {
        throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env')
    }

    // Create new Svix instance with secret
    const wh = new Webhook(SIGNING_SECRET)

    // Get headers and body
    const headers = req.headers
    const payload = req.body

    // Get Svix headers for verification
    const svix_id = headers['svix-id']
    const svix_timestamp = headers['svix-timestamp']
    const svix_signature = headers['svix-signature']

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return void res.status(400).json({
            success: false,
            message: 'Error: Missing svix headers',
        })
    }

    let evt: any;

    // Attempt to verify the incoming webhook
    // If successful, the payload will be available from 'evt'
    // If verification fails, error out and return error code
    try {
        evt = wh.verify(payload, {
            'svix-id': svix_id as string,
            'svix-timestamp': svix_timestamp as string,
            'svix-signature': svix_signature as string,
        })
    } catch (err: any) {
        console.log('Error: Could not verify webhook:', err.message)
        return void res.status(400).json({
            success: false,
            message: err.message,
        })
    }
    try {
        // Do something with payload
        // For this guide, log payload to console
        const { id } = evt.data
        const eventType = evt.type
        console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
        if (evt.type === 'user.created') {
            console.log('Webhook payload:', evt.data)
            await User.create({
                clerkUserId: evt.data.id,
                username: evt.data.username || evt.data.email_addresses[0].email_address,
                email: evt.data.email_addresses[0].email_address,
                img: evt.data.profile_image_url
            })
        }
        return void res.status(200).json({
            success: true,
            message: 'Webhook received',
        })
    } catch (err) {
        return void res.status(400).json({ success: false, message: "Couldn't create user" + `${evt.data.profile_image_url}` })
    }
}

