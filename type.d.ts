export type ButtonProps = {
  label: string;
  onPress: () => void;
  theme?: string;
};

export type CircleButtonProps = {
  onPress: () => void;
};

export type IconButtonProps = {
  label: string;
  onPress: () => void;
  icon: string;
};

export type EmojiListProps = {
  onSelect: (arg: any) => void;
  onCloseModal: () => void;
};
