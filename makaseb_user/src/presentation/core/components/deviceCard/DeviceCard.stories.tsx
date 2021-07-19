import React from "react";
import { Story, Meta } from "@storybook/react";

import { DeviceCard, DeviceCardProps } from "./DeviceCard";

export default {
  title: "Example/deviceCard",
  component: DeviceCard,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta;

const Template: Story<DeviceCardProps> = (args) => <DeviceCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
