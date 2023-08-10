# Copyright (c) 2023, desoky and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class Property(Document):
    # pass
	# def validate(self):
	# 	frappe.msgprint((f"You can't save this <b>{self.name}</b>"))
		#frappe.db.sql("""Select amenity from `tabProperty Amenity Detail` where parent="0003" """")

	@frappe.whitelist()
	def check_property_types(self , property_type):
		# frappe.msgprint(str(property_type))
		return frappe.db.sql(f"""select name ,property_type from `tabProperty` where property_type='{self.property_type}' ;""",as_dict=True )
        