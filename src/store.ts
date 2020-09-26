import SubX from 'subx';

export type StoreType = {
  loadPercent: number;
};

const store = SubX.proxy<StoreType>({
  loadPercent: 0,
});

export default store;
