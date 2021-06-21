import React from "react";
import { Story, Meta } from "@storybook/react";

import { SearchField, SearchFieldProps } from "./SearchField";

export default {
  title: "Example/searchField",
  component: SearchField,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta;

const Template: Story<SearchFieldProps> = (args) => <SearchField {...args} />;

export const Primary = Template.bind({});
Primary.args = {
      placeHolder:"test placeHolder"
};
