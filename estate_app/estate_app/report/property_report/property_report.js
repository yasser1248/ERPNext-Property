// Copyright (c) 2023, desoky and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Property Report"] = {
	"filters": [
		{
			"fieldname":"property",
			"label":("Property Name"),
			"fieldtype":"Data",
			"width":100,
			"reqd":0,
		},{
			"fieldname":"from",
			"label":("From Date"),
			"fieldtype":"Date",
			"width":80,
			"reqd":1,
			"default":dateutil.year_start(),
		},{
			"fieldname":"to",
			"label":("To Date"),
			"fieldtype":"Date",
			"width":80,
			"reqd":1,
			"default":dateutil.year_end(),
		},{
			"fieldname":"agent",
			"label":("Agent Name"),
			"fieldtype":"Link",
			"options":"Agent",
			"width":100,
			"reqd":0,
		},{
			"fieldname":"status",
			"label":("Status"),
			"fieldtype":"Select",
			"default":"",
			"options":['Sale','Rent','Lease'],
			"width":100,
			"reqd":0,
		},
	]
};
