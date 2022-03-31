import React, { useState, useContext } from "react";

import { MobileDiv, Button, Card, Text } from "components/common";

export function StakingContainer({}) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ width: "80%" }}>
        <div>
          <div>
            <br></br>
            <Text fontWeight="600">veSHN Staking</Text>
            <p>If you have locked your SHN and got veSHN, you are eligible for veSHN staking.</p>
          </div>
          <div>
            <table>
              <tr>
                <th>APR Base/Max</th>
                <th>20% / 120%</th>
              </tr>
              <tr>
                <td>% locked</td>
                <td>25%</td>
              </tr>
              <tr>
                <td>TVL</td>
                <td>$525k</td>
              </tr>
            </table>
            <Button>CHECKPOINT</Button>   
            <br></br><span> <i>After you create, add or increase the timelock you need to checkpoint in order to account the new amount for the reward.</i> </span > 
            <br></br> <br></br> <br></br>
            <Button>CLAIM</Button>
            <br></br> <br></br>
            <Text fontWeight="600">Earned so far:</Text> 0 SHN 🌟
           
          </div>
        </div>
      </div>
    </div>
  );
}
