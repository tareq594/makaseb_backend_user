import React from "react";
import { Story, Meta } from "@storybook/react";

import { Logo, LogoProps } from "./Logo";

export default {
  title: "Example/Logo",
  component: Logo,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta;

const Template: Story<LogoProps> = (args) => <Logo {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  backgroundColor: "red",
  size: "small",
};
