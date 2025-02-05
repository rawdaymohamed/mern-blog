// "use client";
// import React, { useEffect, useState } from "react";
// import { useAuth, useUser } from "@clerk/nextjs";
// import "react-quill-new/dist/quill.snow.css";
// import dynamic from "next/dynamic";
// import axios from "axios";
// import clsx from "clsx";
// import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";
// import { FaRegImages, FaVideo } from "react-icons/fa6";
// import { Upload } from "@/components/Upload.jsx";
// import { useMutation } from "@tanstack/react-query";
// const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

// const Page = () => {
//   const router = useRouter();
//   const { isLoaded, isSignedIn } = useUser();
//   const { getToken } = useAuth();
//   const [cover, setCover] = useState("");
//   const [img, setImg] = useState("");
//   const [video, setVideo] = useState("");
//   const [progress, setProgress] = useState(0);
//   const [value, setValue] = useState(""); // For ReactQuill content
//   const [title, setTitle] = useState(""); // For the title
//   const [category, setCategory] = useState("General"); // For the category
//   const [description, setDescription] = useState(""); // For the description

//   const validateForm = () => {
//     if (!cover) return "Cover image is required.";
//     if (!title || title.length < 3 || title.length > 100)
//       return "Title must be between 3 and 100 characters.";
//     if (description.length > 500)
//       return "Description cannot exceed 500 characters.";
//     if (!value || value.length < 10 || value.length > 10000)
//       return "Content must be between 10 and 10000 characters.";
//     return null;
//   };

//   const mutation = useMutation({
//     mutationFn: async (newPost) => {
//       const token = await getToken();
//       return axios.post(`${process.env.NEXT_PUBLIC_API_URL}/posts`, newPost, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//     },
//     onSuccess: (res) => {
//       toast.success("Post created successfully!");
//       router.push("/" + res.data?.data?.slug);
//     },
//     onError: (error) => {
//       toast.error(error.response.data);
//     },
//   });

//   useEffect(() => {
//     if (img) {
//       setValue((prev) => prev + `<p><img src="${img.url}" /></p>`);
//     }
//   }, [img]);

//   useEffect(() => {
//     if (video) {
//       setValue(
//         (prev) => prev + `<p><iframe class="ql-video" src="${video.url}" /></p>`
//       );
//     }
//   }, [video]);

//   if (!isLoaded) return <p>Loading...</p>;
//   if (isLoaded && !isSignedIn) return <p>Please Login to Access this Page</p>;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const errorMessage = validateForm();
//     if (errorMessage) {
//       toast.error(errorMessage);
//       return;
//     }
//     const data = {
//       img: cover.url,
//       title,
//       category,
//       desc: description,
//       content: value,
//     };
//     mutation.mutate(data);
//   };

//   return (
//     <div className="flex flex-col gap-8 text-gray-700 h-[calc(100vh-64px)] md:h-[calc(100vh-80px)]">
//       <h1 className="font-light text-2xl lg:text-3xl text-gray-900">
//         Create a New Post
//       </h1>
//       <form className="flex flex-col gap-8 flex-grow" onSubmit={handleSubmit}>
//         <div>
//           <Upload setProgress={setProgress} setData={setCover} type="image">
//             <button
//               type="button"
//               className="shadow-md px-4 py-2 rounded-md bg-white"
//             >
//               Add a cover image
//             </button>
//           </Upload>
//         </div>
//         <input
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           placeholder="My Awesome Story"
//           className="text-xl font-bold bg-transparent outline-none"
//         />
//         <div className="flex gap-4 items-center">
//           <label htmlFor="categories" className="text-sm text-blue-700">
//             Choose a category:
//           </label>
//           <select
//             name="categories"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             className="p-2 rounded-md shadow-sm"
//           >
//             <option value="General">General</option>
//             <option value="web-design">Web Design</option>
//             <option value="development">Development</option>
//             <option value="databases">Databases</option>
//             <option value="seo">Search Engines</option>
//             <option value="Marketing">Marketing</option>
//           </select>
//         </div>
//         <textarea
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           rows={4}
//           placeholder="A short description"
//           className="p-4 bg-white shadow-sm rounded-md outline-none"
//         />
//         <div className="mt-5 flex flex-1 gap-2">
//           <div className="flex flex-col gap-2">
//             <div className="cursor-pointer">
//               <Upload setProgress={setProgress} setData={setImg} type="image">
//                 <FaRegImages />
//               </Upload>
//             </div>
//             <div className="cursor-pointer">
//               <Upload setProgress={setProgress} setData={setVideo} type="video">
//                 <FaVideo />
//               </Upload>
//             </div>
//           </div>
//           <ReactQuill
//             theme="snow"
//             value={value}
//             readOnly={progress > 0 && progress < 100}
//             onChange={setValue}
//             className="flex-1 bg-white shadow-sm rounded-md outline-none"
//           />
//         </div>
//         <div>
//           <button
//             type="submit"
//             disabled={mutation.isPending || (progress > 0 && progress < 100)}
//             className={clsx(
//               "btn-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline text-white font-normal py-2 px-4 rounded mt-8",
//               {
//                 "bg-blue-700 hover:bg-blue-900": !(
//                   mutation.isPending ||
//                   (progress > 0 && progress < 100)
//                 ),
//                 "bg-blue-400 cursor-not-allowed":
//                   mutation.isPending || (progress > 0 && progress < 100),
//               }
//             )}
//           >
//             {mutation.isPending ? "Loading" : "Post"}
//           </button>
//         </div>
//         {"Progress: " + progress + "%"}
//       </form>
//     </div>
//   );
// };

// export default Page;
"use client";
import React, { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import "react-quill-new/dist/quill.snow.css";
import dynamic from "next/dynamic";
import axios from "axios";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FaRegImages, FaVideo } from "react-icons/fa6";
import { Upload } from "@/components/Upload.jsx";
import { useMutation } from "@tanstack/react-query";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const Page = () => {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useUser();
  const { getToken } = useAuth();
  const [cover, setCover] = useState("");
  const [img, setImg] = useState("");
  const [video, setVideo] = useState("");
  const [progress, setProgress] = useState(0);
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("General");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (cover) setErrors((prev) => ({ ...prev, cover: undefined }));
  }, [cover]);

  const validateForm = () => {
    const errors = {};
    if (!cover) errors.cover = "Cover image is required.";
    if (!title) {
      errors.title = "Title is required.";
    } else if (title.length < 3 || title.length > 100) {
      errors.title = "Title must be between 3 and 100 characters.";
    }
    if (description.length > 500) {
      errors.description = "Description cannot exceed 500 characters.";
    }
    if (!value) {
      errors.content = "Content is required.";
    } else if (value.length < 10 || value.length > 10000) {
      errors.content = "Content must be between 10 and 10000 characters.";
    }
    return errors;
  };

  const mutation = useMutation({
    mutationFn: async (newPost) => {
      const token = await getToken();
      return axios.post(`${process.env.NEXT_PUBLIC_API_URL}/posts`, newPost, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: (res) => {
      toast.success("Post created successfully!");
      router.push("/" + res.data?.data?.slug);
    },
    onError: (error) => {
      toast.error(error.response.data);
    },
  });

  useEffect(() => {
    if (img) {
      setValue((prev) => prev + `<p><img src="${img.url}" /></p>`);
    }
  }, [img]);

  useEffect(() => {
    if (video) {
      setValue(
        (prev) => prev + `<p><iframe class="ql-video" src="${video.url}" /></p>`
      );
    }
  }, [video]);

  if (!isLoaded) return <p>Loading...</p>;
  if (isLoaded && !isSignedIn) return <p>Please Login to Access this Page</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    const data = {
      img: cover.url,
      title,
      category,
      desc: description,
      content: value,
    };
    mutation.mutate(data);
  };

  return (
    <div className="flex flex-col gap-8 text-gray-700 h-[calc(100vh-64px)] md:h-[calc(100vh-80px)]">
      <h1 className="font-light text-2xl lg:text-3xl text-gray-900">
        Create a New Post
      </h1>
      <form className="flex flex-col gap-8 flex-grow" onSubmit={handleSubmit}>
        <div>
          <Upload setProgress={setProgress} setData={setCover} type="image">
            <button
              type="button"
              className="shadow-md px-4 py-2 rounded-md bg-white"
            >
              Add a cover image
            </button>
          </Upload>
          {errors.cover && (
            <p className="text-red-500 text-sm mt-1">{errors.cover}</p>
          )}
        </div>

        <div>
          <input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setErrors((prev) => ({ ...prev, title: undefined }));
            }}
            placeholder="My Awesome Story"
            className="text-xl font-bold bg-transparent outline-none w-full"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        <div className="flex gap-4 items-center">
          <label htmlFor="categories" className="text-sm text-blue-700">
            Choose a category:
          </label>
          <select
            name="categories"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 rounded-md shadow-sm"
          >
            <option value="General">General</option>
            <option value="web-design">Web Design</option>
            <option value="development">Development</option>
            <option value="databases">Databases</option>
            <option value="seo">Search Engines</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>

        <div>
          <textarea
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setErrors((prev) => ({ ...prev, description: undefined }));
            }}
            rows={4}
            placeholder="A short description"
            className="p-4 bg-white shadow-sm rounded-md outline-none w-full"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        <div className="mt-5 flex flex-1 gap-2">
          <div className="flex flex-col gap-2">
            <div className="cursor-pointer">
              <Upload setProgress={setProgress} setData={setImg} type="image">
                <FaRegImages />
              </Upload>
            </div>
            <div className="cursor-pointer">
              <Upload setProgress={setProgress} setData={setVideo} type="video">
                <FaVideo />
              </Upload>
            </div>
          </div>
          <div className="flex-1">
            <ReactQuill
              theme="snow"
              value={value}
              onChange={(value) => {
                setValue(value);
                setErrors((prev) => ({ ...prev, content: undefined }));
              }}
              className="flex-1 bg-white shadow-sm rounded-md outline-none"
            />
            {errors.content && (
              <p className="text-red-500 text-sm mt-1">{errors.content}</p>
            )}
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={mutation.isPending || (progress > 0 && progress < 100)}
            className={clsx(
              "btn-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline text-white font-normal py-2 px-4 rounded mt-8",
              {
                "bg-blue-700 hover:bg-blue-900": !(
                  mutation.isPending ||
                  (progress > 0 && progress < 100)
                ),
                "bg-blue-400 cursor-not-allowed":
                  mutation.isPending || (progress > 0 && progress < 100),
              }
            )}
          >
            {mutation.isPending ? "Loading" : "Post"}
          </button>
        </div>
        {"Progress: " + progress + "%"}
      </form>
    </div>
  );
};

export default Page;
