export const formatPhoneNumber = (phoneNumber: number): string => {
  const phoneString = phoneNumber.toString();
  const formattedPhoneNumber = `(${phoneString.substring(0, 2)}) ${phoneString.substring(2, 6)}-${phoneString.substring(6)}`;
  return formattedPhoneNumber;
};

export const formatCPF = (cpf: string): string => {
  const cpfRegex = /^(\d{3})(\d{3})(\d{3})(\d{2})$/;
  return cpf.replace(cpfRegex, "$1.$2.$3-$4");
};
