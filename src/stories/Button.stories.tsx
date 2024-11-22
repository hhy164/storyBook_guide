import type { Meta, StoryObj } from '@storybook/react';
import { fn, userEvent } from '@storybook/test';
import { within } from '@storybook/test';
import { Button } from './Button';
import { expect } from '@storybook/test';

const meta = {
  title: 'Yu/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    backgrounds: {
      values: [
        { name: '粉色', value: 'pink' },
        { name: '天蓝色', value: 'skyblue' }
      ]
    }
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Button',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Button',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    label: 'Button',
  },
};

export const demo: Story = {
  args: {
    size: 'small',
    label: 'demo',
    backgroundColor: '#acf'
  },
  render(args, meta) {
    const list = meta.loaded.list;
    return <div>
      <div>{list.join(',')}</div>
      <Button {...args} />
    </div>
  },
  loaders: [
    async () => {
      await '假装 fetch'
      return {
        list: [111, 222, 333]
      }
    }
  ]
}
export const Yu: Story = {
  args: {
    size: 'large',
    label: '🌧️',
    backgroundColor: '#fac'
  },
  render(args) {
    return <div>
      <button>aaa</button>
      <Button {...args} />
      <button>bbb</button>
    </div>
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const btn = await canvas.getByRole('button', {
      name: /🌧️/i
    })
    await userEvent.click(btn)
    await expect(btn.textContent).toEqual('🌧️')
    await expect(btn.style.backgroundColor).toEqual('rgb(255, 170, 204)')
    btn.textContent = 'yu'
  }
} 