import React from "react";
import { Story, Meta } from "@storybook/react";

import { DropDown, DropDownProps } from "./DropDown";
import { colors } from "@material-ui/core";

export default {
  title: "Example/dropDown",
  component: DropDown,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta;

const Template: Story<DropDownProps> = (args) => <DropDown {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: "test",
  hoverColor: colors.red[100],
  selectedColor: colors.red[500],
  textColor: colors.red[300],
  labelColor: colors.red[300],
  id: "test",
  defaultValue: "1",
  options: ["1", "2", "3"],
  onChange: (value) => {
    console.log(value);
  },
};
