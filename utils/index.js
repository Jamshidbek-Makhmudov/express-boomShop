import moment from "moment"
export default {
  ifequal(a, b, options) {
    if (a == b) {
      return options.fn(this)
    }
    return options.inverse(this)
  },
  getFirstLetter(firstName, lastName) {
    return `${firstName.charAt(0)}. ${lastName.charAt(0)}`
    //ismlarni bosh harfini chiqarish uchun function helpers
  },
  formatDate(date) {
    return moment().format("DD MMM YYYY")
  },
}
//biz functionni if equal ma'nosini berish uchun qolda yozib oldik
//agar 2ta condition teng bolsa, allow bomasa dont allow boladi
