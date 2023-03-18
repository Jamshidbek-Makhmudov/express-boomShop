export default {
  ifequal(a, b, options) {
    if (a == b) {
      return options.fn(this)
    }
    return options.inverse(this)
  },
}
//biz functionni if equal ma'nosini berish uchun qolda yozib oldik
//agar 2ta cindition teng bolsa, allow bomasa dont allow boladi
