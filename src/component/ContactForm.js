import { useForm } from "react-hook-form";
import { useEffect } from "react";


function ContactForm() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();
      const onSubmit = (data) => console.log(data);
    
  return (
    <form className="flex flex-col gap-5 mt-16 sm:p-3 w-1/2.5 bg-gray-800 p-6 rounded-md shadow-lg shadow-orange-600" onSubmit={handleSubmit(onSubmit)}>
        {/* Name Section */}
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="firstname" className="text-sm font-medium  text-white ">
              First Name<sup className="text-red-400 " >*</sup>
            </label>
            <input
              type="text"
              id="firstname"
              placeholder="Enter first name"
              className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="lastname" className="text-sm font-medium text-white">Last Name</label>
            <input
              type="text"
              id="lastname"
              placeholder="Enter last name"
              className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        </div>

        {/* Email Address */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-white">
            Email Address<sup className="text-red-400">*</sup>
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter email address"
            className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Phone Number */}
        <div className="flex flex-col gap-2">
          <label htmlFor="phonenumber" className="text-sm font-medium text-white">
            Phone Number<sup className="text-red-400">*</sup>
          </label>
          <div className="flex gap-4">
            <select className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 w-1/4">
              <option value="+91">+91</option>
            </select>
            <input
              type="number"
              id="phonenumber"
              placeholder="12345 67890"
              className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 w-3/4"
            />
          </div>
        </div>

        {/* Message */}
        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="text-sm font-medium text-white">
            Message<sup className="text-red-400">*</sup>
          </label>
          <textarea
            id="message"
            rows="5"
            placeholder="Enter your message here"
            className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <button
          type="submit"
          className="rounded-md bg-yellow-500 px-6 py-3 text-center text-white font-bold shadow-md hover:bg-yellow-600 transition-all"
        >
          Send Message
        </button>
      </form>
  )
}

export default ContactForm
