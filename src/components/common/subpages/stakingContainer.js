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
            <br></br>
            <br></br>
            <Button>CLAIM</Button>
            <span title="amazing span"> Hello i'm a span </span > 
          </div>
        </div>
      </div>
    </div>
  );
}
