export const formatPhoneNumber = (value: any): string => {
  const stringValue = String(value);
  const cleanedValue = stringValue.replace(/\D/g, "");

  return cleanedValue
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{4})\d+?$/, "$1");
};


export const formatCPForCNPJ = (value: string): string => {
  const cleanedValue = value.replace(/\D/g, "");

  if (cleanedValue.length <= 11) {
    // CPF Formatting
    return cleanedValue
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  } else {
    // CNPJ Formatting
    return cleanedValue
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1/$2")
      .replace(/(\d{4})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  }
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedDay = day.toString().padStart(2, "0");
  const formattedMonth = month.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes} - ${formattedDay}/${formattedMonth}/${year}`;
};

export const formatCurrency = (value: number): string => {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formatter.format(value);
};
