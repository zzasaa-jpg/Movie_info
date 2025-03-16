import React, { useState } from 'react';
import { FaArrowUp } from "react-icons/fa";

// ScrollButton function
function ScrollButton() {
    let [visible, setVisible] = useState(false)

    let togglevisible = () => {
        let scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(true)
        } else if (scrolled <= 300) {
            setVisible(false)
        }
    };

    let scrolltop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    window.addEventListener('scroll', togglevisible);

    return (
        <div className='min-h-auto flex justify-end'>
            <button className={!visible ? 'hidden' : "block mx-5 lg:mx-10 bg-white text-[30px] lg:my-2 my-1 rounded-[2px] "}>
                <FaArrowUp onClick={scrolltop} className=' ' />
            </button>
        </div>
    )
}

export default ScrollButton;