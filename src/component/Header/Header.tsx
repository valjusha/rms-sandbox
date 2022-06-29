import React from "react";
import { Button, Form, InputNumber } from "antd";
// import { useFakeResourceRecord } from "@store/context/FakeResourceRecord";

export const Header = () => {
  // const { formData, updateFormData } = useFakeResourceRecord();
  // const { rows, items_per_row } = formData;

  const handleZoomIn = () => {};
  const handleZoomOut = () => {};

  return (
    <Form layout="inline">
      <Form.Item label="rows">
        <InputNumber
          // value={rows}
          // onChange={(e) => updateFormData({ rows: e })}
        />
      </Form.Item>
      <Form.Item label="items per row">
        <InputNumber
          // value={items_per_row}
          // onChange={(e) => updateFormData({ items_per_row: e })}
        />
      </Form.Item>
      <Form.Item>
        <Button onClick={handleZoomIn}>Zoom in</Button>
      </Form.Item>
      <Form.Item>
        <Button onClick={handleZoomOut}>Zoom out</Button>
      </Form.Item>
    </Form>
  );
};
