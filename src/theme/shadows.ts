export interface CustomShadowType {
  [key: string]: string;
}

const createCustomShadow = (): CustomShadowType => {
  return {
    z1: `0 4px 8px rgba(0, 0, 0, 0.2)`,
    primary: "0px 0px 20px -10px rgb(177, 176, 176)",
  };
};

export const customShadows = {
  ...createCustomShadow(),
};
