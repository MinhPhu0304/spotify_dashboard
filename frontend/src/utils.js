export function formatNumber(value) {
    if (typeof value != 'number') {
        return 0
    }
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
