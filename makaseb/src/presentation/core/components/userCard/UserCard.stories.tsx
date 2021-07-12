import React from "react";
import { Story, Meta } from "@storybook/react";

import { UserCard, UserCardProps } from "./UserCard";

export default {
  title: "Example/UserCard",
  component: UserCard,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta;

const Template: Story<UserCardProps> = (args) => <UserCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
