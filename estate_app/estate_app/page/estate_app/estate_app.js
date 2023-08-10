frappe.pages['estate-app'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Estate App',
		single_column: true
	});
}