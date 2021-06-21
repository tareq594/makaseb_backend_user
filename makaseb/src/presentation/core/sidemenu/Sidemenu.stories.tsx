 import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Sidemenu, SidemenuProps } from './Sidemenu';

export default {
  title: 'Example/Sidemenu',
  component: Sidemenu,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<SidemenuProps> = (args) => <Sidemenu {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  width: 240,
}; 