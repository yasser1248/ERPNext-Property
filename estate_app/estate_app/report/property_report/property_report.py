# Copyright (c) 2023, desoky and contributors
# For license information, please see license.txt

import frappe
from frappe import _


def execute(filters=None):
	# columns, data = [], []
	return get_columns(), get_data(filters)


def get_data(filters):
	print(f"\n\n\n\{filters}\n\n\n\n")
	_from,to=filters.get('from'),filters.get('to')
	print(f"\n\n\n\{_from }\n\n\n\n")
	print(f"\n\n\n\{to }\n\n\n\n")
	conditions=" and 1=1 "
	if(filters.get('property')):conditions+=f"and property_name='{filters.get('property')}'"
	if(filters.get('agent')):conditions+=f"and agent='{filters.get('agent')}'"
	if(filters.get('status')):conditions+=f"and status='{filters.get('status')}'"
	print(f"\n\n\n\{conditions}\n\n\n\n")

	data=frappe.db.sql(f""" select name,property_name,address,property_type,status,property_price,discount,grand_total,agent,get_agent_name from `tabProperty` where (creation BETWEEN '{_from}' AND '{to}') {conditions} ; """)
	return data
	# [{'name':'0001','property_name':'Property1','status':'Rent'}]
		# [['0002','Property2','Rent']]
		


def get_columns():
	return[
			"ID:Link/Property:70",
			"Property Name:Data:150",
			"Address:Data:150",
			"Type:Data:100",
			"Status:Data:100",
			"Price:Currency:100",
			"Discount:Percent:80",
			"Grand Total:Currency:150",
			"Agent:Data:100",
			"Get Agent Name:Data:100",
			


	]