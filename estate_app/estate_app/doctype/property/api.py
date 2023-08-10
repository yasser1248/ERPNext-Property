import frappe 



@frappe.whitelist()
def check_property_types(property_type):
    return frappe.db.sql(f"""select name ,property_type from `tabProperty` where property_type='{property_type}' ;""",as_dict=True )