import React from 'react'
import { useState, useEffect } from 'react';
import BoolToggle from '../../Common/BoolToggle/BoolToggle';
import FeetInchesInput from '../FeetInchesInput/FeetInchesInput';
import NumInput from '../../Common/NumInput/NumInput';
import SubmitButton from '../../Common/SubmitButton/SubmitButton';


const BMRForm = ({ BMRData, setBMRData, useMetricSystem, setMetricSystem, setFormComplete }) => {

    const [isMale, setMale] = useState(true);
    const [age, setAge] = useState('');
    const [height, setHeight] = useState('');
    const [weightMetric, setWeightMetric] = useState('');
    const [weightImperial, setWeightImperial] = useState('');
    const [typingTimeout, setTypingTimeout] = useState(0);

    const updateFormInfo = () => {
        // Obtain weight in correct unit system.
        let weight;
        if (useMetricSystem) {
            weight = weightMetric;
        } else {
            if (!!weightImperial) {
                weight = weightImperial * 0.4536;
            } else {
                weight = '';
            }
        }
        
        // Update health data
        let updatedBMRData = {
            ...BMRData,
            isMale: isMale,
            age: age,
            height: (height === '' ? '' : height / 100.0),
            initialWeight: weight
        };
        setBMRData(updatedBMRData);

        // Update whether or not the form is completely filled out
        setFormComplete(age !== '' && height !== '' && weight !== '');
        console.log("Updated BMR data.");
    }

    useEffect(() => {
        setFormComplete(false);
        if (typingTimeout) clearTimeout(typingTimeout);
        setTypingTimeout(setTimeout(updateFormInfo, 750));

    }, [isMale, age, height, weightMetric, weightImperial, useMetricSystem])

  return (
    <form>
        <BoolToggle 
            className="unitSystemToggle"
            boolValue={useMetricSystem} 
            setBoolValue={setMetricSystem} 
            defaultText="Metric" 
            alternateText="Imperial"
            activeColor="#ffffff"
            activeTextColor="#000000"/>
        <BoolToggle 
            className='genderToggle'
            boolValue={isMale} 
            setBoolValue={setMale} 
            defaultText='Male' 
            alternateText='Female'
            activeColor='#ffffff'
            activeTextColor='#000000'/>
        <NumInput number={age} setNumber={setAge} units='yr' description='Age' color='green'/>

        {/* This is how you have to do conditional rendering within the return() function */}
        {useMetricSystem && 
            <div>
                <NumInput number={height} setNumber={setHeight} units='cm' description='&nbsp;Height' color='green'/>
                <NumInput number={weightMetric} setNumber={setWeightMetric} units='kg' description='&nbsp;Weight' color='green'/>
            </div>
        }
        {!useMetricSystem && 
            <div>
                <FeetInchesInput number={height} setOutput={setHeight} description='&nbsp;&nbsp;&nbsp;Height' color='green'/>
                <NumInput number={weightImperial} setNumber={setWeightImperial} units='lb' description='&nbsp;&nbsp;Weight' color='green'/>
            </div>
        }
    </form>
  )
}

export default BMRForm