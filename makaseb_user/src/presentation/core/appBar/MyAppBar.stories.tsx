import React from 'react';
import { Story, Meta } from '@storybook/react';

import { MyAppBar, MyAppBarProps } from './MyAppBar';

export default {
  title: 'Example/MyAppBar',
  component: MyAppBar,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<MyAppBarProps> = (args) => <MyAppBar {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  backgroundColor: "red",
  width:240,
  handleDrawerToggle:()=>{console.log("open drawer")}
}; 