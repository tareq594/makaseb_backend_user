import React from "react";
import { Story, Meta } from "@storybook/react";

import { Layout, LayoutProps } from "./Layout";

export default {
  title: "Example/Layout",
  component: Layout,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta;

const Template: Story<LayoutProps> = (args) => <Layout {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primaryColor: "red",
  drawerWidth: 240,
};
