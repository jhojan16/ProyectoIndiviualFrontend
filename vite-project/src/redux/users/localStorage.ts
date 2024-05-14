export const saveWithouExpiry = (key: string, data: any) => {
    const item = { 
        data: data
    };
    localStorage.setItem(key, JSON.stringify(item));
};

export const getWithoutExpiry = (key: string) => {
    const itemStr = localStorage.getItem(key);

    // Si no hay datos, retorna null
    if (!itemStr) {
        return null;
    }

    const item = JSON.parse(itemStr);
    return item.data;
};
