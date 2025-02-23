import { useForm } from "react-hook-form";
import { useEffect } from "react";
import ContactForm from "./ContactForm";

export default function Contact() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  useEffect(() => {
    document.body.style.backgroundColor = "#030712"; // Tailwind's bg-gray-900

    return () => {
        document.body.style.backgroundColor = ""; // Reset when unmounting
    };
}, []);
  return (
    <div className="flex min-h-screen flex-col lg:flex-row md:items-center justify-around lg:pt-11 pt-24 px-4 sm:px-16">
      <div class="max-w-lg bg-gray-900 text-white p-6 rounded-lg shadow-lg space-y-6">
        <div className="">
          <h2 class="text-lg font-semibold flex items-center space-x-2">
            <span>💬</span> <span>Chat with us</span>
          </h2>
          <p class="text-sm text-gray-400">Our friendly team is here to help.</p>
          <p class="text-sm font-medium text-gray-200">info@brightpath.com</p>
        </div>

        <div>
          <h2 class="text-lg font-semibold flex items-center space-x-2">
            <span>📍</span> <span>Visit us</span>
          </h2>
          <p class="text-sm text-gray-400">Come and say hello at our office HQ.</p>
          <p class="text-sm font-medium text-gray-200">
            Akshya Nagar 1st Block 1st Cross, Rammurthy Nagar, Bangalore-560016
          </p>
        </div>

        <div>
          <h2 class="text-lg font-semibold flex items-center space-x-2">
            <span>📞</span> <span>Call us</span>
          </h2>
          <p class="text-sm text-gray-400">Mon - Fri from 8am to 5pm</p>
          <p class="text-sm font-medium text-gray-200">+123 456 7869</p>
        </div>
      </div>
      <ContactForm></ContactForm>
    </div>

  );
}
