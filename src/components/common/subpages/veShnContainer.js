import React, { useState, useContext } from "react";

import { SliderContainer, Slider } from "components/common/Container/index";
import { MobileDiv, Button, Card, Text } from "components/common";

export function VeShnContainer({}) {

  function handleChange(e) {
    setSliderValue(e.target.value);
  }
  const [sliderValue, setSliderValue] = useState(90);

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ width: "80%" }}>
       
          <div>
            <div>
              <br></br>
              <Text fontWeight="600">veSHN</Text>
              <p>veSHN is a governance modelled after Curve's veCRV and Frax's veFXS vote escrow model where the users with longer lock time receive higher weighted voting power.</p>
            </div>
            <div>
              <SliderContainer>
                <Slider type="range" min="7" max="1460" value={sliderValue} onChange={handleChange}></Slider>
                <input onChange={handleChange} value={sliderValue} style={{ borderRadius: 6, boder: "1px solid #3f3d56", marginLeft: 35 }}></input>
                <span>{" Days "} </span>
                {sliderValue > 1460 && <Text color="red">Maximum allowed lock time is 4 Years / 1460 days</Text>}
              </SliderContainer>{" "}
              <Text>Please select the lock time:</Text>
              <Button>Create Lock</Button>
            </div>
          </div>
      
      
      </div>
    </div>
  );
}
