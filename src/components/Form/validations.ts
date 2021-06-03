const MAX_SIZE = 10000000;

export const formValidations = {
  image: {
    required: 'Arquivo obrigatório',
    validate: {
      lessThan10MB: data =>
        (data && data[0].size <= MAX_SIZE) ||
        'O arquivo deve ser menor que 10MB',
      acceptedFormats: data =>
        RegExp('^image\\/(gif|jpeg|png)$').test(data[0].type) ||
        'Somente são aceitos arquivos PNG, JPEG e GIF',
    },
  },
  title: {
    required: 'Titulo obrigatório',
    minLength: { value: 2, message: 'Mínimo de 2 caracteres' },
    maxLength: { value: 20, message: 'Máximo de 20 caracteres' },
  },
  description: {
    required: 'Descrição obrigatória',
    maxLength: { value: 65, message: 'Máximo de 20 caracteres' },
  },
};
