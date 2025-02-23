import React, { useEffect } from 'react';
import img1 from '../assest/1st.jpg';
import img2 from '../assest/2nd.jpg';
import img3 from '../assest/3rd.jpg';
import ContactForm from './ContactForm';

function AboutUs() {
    useEffect(() => {
        document.body.style.backgroundColor = "#1F2937"; // Tailwind's bg-gray-900

        return () => {
            document.body.style.backgroundColor = ""; // Reset when unmounting
        };
    }, []);

    return (
        <div>
            <div className="py-20 pb-6 px-6 md:px-24 bg-gray-95s0 text-center">
                <h1 className="text-4xl md:text-6xl py-6 text-gray-200">
                    Driving Innovation in Online Education for a
                </h1>
                <h2 className="text-4xl md:text-6xl py-3 text-blue-400">
                    Brighter Future
                </h2>
                <p className="text-lg md:text-2xl text-gray-400 py-4">
                    BrightPath is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
                </p>

                {/* Image Grid */}
                <div className="grid grid-cols-3 gap-4 md:gap-8 ">
                    <div className="  flex justify-center">
                        <img src={img1} alt="Image 1" className="w-28 h-20 md:w-60 md:h-48 object-cover rounded-xl shadow-lg shadow-black" />
                    </div>
                    <div className="  flex justify-center">
                        <img src={img2} alt="Image 2" className="w-28 h-20 md:w-60 md:h-48 object-cover rounded-xl  shadow-lg shadow-black" />
                    </div>
                    <div className="  flex justify-center">
                        <img src={img3} alt="Image 3" className="w-28 h-20 md:w-60 md:h-48 object-cover rounded-xl  shadow-lg shadow-black"  />
                    </div>
                </div>
            </div>

            <div className="py-20 px-6 md:px-24 bg-gray-950 text-center">
                <h1 className="text-white text-2xl md:text-4xl">
                    We are passionate about revolutionizing the way we learn. Our innovative platform <strong className="text-orange-700">combines technology</strong>, expertise, and community to create an <strong className="text-pink-600">unparalleled educational experience</strong>.
                </h1>
            </div>
            <div className="flex min-h-screen flex-col lg:flex-row md:items-center justify-around lg:pt-0 pt-0 sm:px-2 bg-gray-950">
            <ContactForm/>
            </div>
        </div>
    );
}

export default AboutUs;
