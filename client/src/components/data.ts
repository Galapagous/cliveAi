export const getTableData = (data: any) => {
  const result = data.map((dataItem: any) => {
    return {
      id: dataItem?.id,
      type: dataItem?.typr,
      description: dataItem?.description,
      amount: dataItem?.amount,
    };
  });
  return result;
};
