/* This module contain all static data that are going to be
   rendered in pages.

   This data will not change dynamically, changes must be hard
   coded.
*/
var years_count = 20;
var date = new Date();
var current_year = date.getFullYear();
var year = current_year;
var years_arr = [];
for (year = current_year; year <= current_year + years_count; year++) {
	years_arr.push(year);
}

module.exports = {

	// A list of all governorates.
	governorates : [
	'الإسكندرية', 
	'الإسماعيلية',
	'أسوان',
	'أسيوط',
	'الأقصر',
	'البحر الأحمر',
	'البحيرة',
	'بني سويف',
	'بورسعيد',
	'جنوب سيناء',
	'الجيزة',
	'الدقهلية',
	'دمياط',
	'سوهاج',
	'السويس',
	'الشرقية',
	'شمال سيناء',
	'الغربية',
	'الفيوم',
	'القاهرة',
	'القليوبية',
	'قنا',
	'كفر الشيخ',
	'مطروح',
	'المنوفية',
	'المنيا',
	'الوادي الجديد'
	],

	// package status
	package_state: ['بحالتها الأصلية', 'مفتوحة لكن غير منقوصة', 'منقوصة'],


	months: [
		{
			value: 'January',
			text: 'يناير'
		},
		{
			value: 'February',
			text: 'فبراير'
		},
		{
			value: 'March',
			text: 'مارس'
		},
		{
			value: 'April',
			text: 'أبريل'
		},
		{
			value: 'May',
			text: 'مايو'
		},
		{
			value: 'June',
			text: 'يونيو'
		},
		{
			value: 'July',
			text: 'يوليو'
		},
		{
			value: 'August',
			text: 'أغسطس'
		},
		{
			value: 'September',
			text: 'سبتمبر'
		},
		{
			value: 'October',
			text: 'أكتوبر'
		},
		{
			value: 'November',
			text: 'نوفمبر'
		},
		{
			value: 'December',
			text: 'ديسمبر'
		}
	],

	years: years_arr























}