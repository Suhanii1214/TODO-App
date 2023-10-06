import React from "react";
import {motion, useMotionValue, useTransform} from 'framer-motion'

const checkVariants = {
    initial: {
        color: '#fff'
    },
    checked: {pathLength: 1},
    unchecked: {pathLength: 0,}
};

const boxVariants = {
    checked: {
        background: '#646FF0',
        transition: { duration: 0.1},
    },
    unchecked: {
        background: '#DEDFE1',
        transition: { duration: 0.1},
    }
};

export const CheckBox = ({checked, handleCheck}) => {
    const pathLength = useMotionValue(0)
    const opacity = useTransform(pathLength, [0.05, 0.15], [0,1])

    return ( 
    <motion.div 
    className="flex basis-6 m-1 shrink-0 justify-center items-center p-5 cursor-pointer ease-in-out hover:bg-slate-500"
    variants = {boxVariants}
    animate = {checked ? 'checked' : 'unchecked'}
    onClick={() => handleCheck}
    >
    <motion.svg
    className= "w-full h-full stroke-white flex justify-center items-center" 
    viewBox="0 0 53 38" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg">
	<motion.path
        variants = {checkVariants}
        animate = {checked ? 'checked' : 'unchecked'}
		fill="none"
        style={{pathLength, opacity}}
		strokeMiterlimit="10"
		strokeWidth="6"
		d="M1.5 22L16 36.5L51.5 1"
		strokeLinejoin="round"
		strokeLinecap="round"
	></motion.path>
</motion.svg>
</motion.div>
    ) 
}