import React from "react";
import { Breadcrumb, Typography } from "antd";
const { Text } = Typography;

export default function ActiveLastBreadcrumb() {
  return (
    <>
      <Breadcrumb
        separator=""
        style={{ position: "relative", left: "15px", textAlign: "left", margin:"15px 0" }}
      >
        <Breadcrumb.Item href="">Tableau de bord</Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item href="">
          <Text>Suivi des demandes</Text>
        </Breadcrumb.Item>
      </Breadcrumb>
    </>
  );
}
