export function rupiahCurrency(price: number): string {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
}

export function formatNumber(number: number): string {
    return new Intl.NumberFormat('id-ID').format(number);
}