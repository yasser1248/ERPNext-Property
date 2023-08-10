// Copyright (c) 2023, desoky and contributors
// For license information, please see license.txt

frappe.ui.form.on('Property', {
	setup:function(frm){
		frm.check_amenities_duplicate=function(frm,row){
			frm.doc.amenities.forEach(item=>{
				if(!row.amenity==''){
					if(row.amenity==item.amenity && row.idx != item.idx ){ 
					
						row.amenity=''
						frappe.throw(`${item.amenity} already exists row ${item.idx} `)
						frm.refresh_field('amenities');
					}
				}
				
			})
		}
		frm.check_flat_against_outdoor_kitchen=function(frm,row){
			if(frm.doc.property_type=='flat'){
				if(row.amenity=='Outdoor Kitchen'){
					row.amenity=''
					frappe.throw(`you cant get <b> Outdoor Kitchen </b> when your Property Type is <b> Flat </b> `)
					frm.refresh_field('amenities');
				}
			}
		}
		
		// Calculate the total price 

		frm.calc_total=function(frm){
			let total=0;
			frm.doc.amenities.forEach(item=>{
				total=total + item.amenity_price;

			})
			let new_total=frm.doc.property_price + total
			if(frm.doc.discount){
				new_total=new_total-(new_total*(frm.doc.discount/100))
			}
			console.log(new_total)
			frm.set_value('grand_total',new_total);
			frm.refresh_field('grand_total')
		}

		// Copy discount for child table 
		frm.copy_discount=function(frm){
			frm.doc.amenities.forEach(item=>{
				item.discount= frm.doc.discount;
				frm.refresh_field('amenities')
			})
		}

		// frm.get_amount_for_amenity=function(frm,row){
		// 	let total_cost=0
		// 	frm.doc.amenities.forEach(item=>{
		// 		if(item.qty!=0){
		// 			row.amount=(row.qty*row.price)
		// 			frm.refresh_field('amenities');
		// 			total_cost+=(item.qty*item.price)
		// 		}
		// 	})
		// 	msgprint(`hello ur Qty is ${total_cost}`)
		// }

	},
	refresh: function(frm) {
		frm.add_custom_button('Say Hello',()=>{
			frappe.prompt("Enter Your Address: ",({ value })=>{
				if(value){
					frm.set_value('address',value);
					frm.refresh_field('address')
					frappe.msgprint((`Address has update with ${value}`))
				}
			})
		},"Actions")
		frm.add_custom_button('Check Property Types',()=>{
				let property_type=frm.doc.property_type
				frappe.call({
					doc:frm.doc,
					// method: "estate_app.estate_app.doctype.property.api.check_property_types", //dotted path to server method
					method: "check_property_types",
					// args:{'property_type':property_type},
					callback: function(r) {
						// code snippet
						if(r.message.length>0){
							let header=`<h3> Below Properties is of type ${property_type}</h3>`;
							let body=``;
							r.message.forEach(item=>{
								let content=`<p> Name:${item.name} : <a href='/app/property/${item.name}'> Visit </a> </p> `
								body=body+content

							})
							let all= header+body

							frappe.msgprint("Document updated Successfully")
							frappe.msgprint(all)
						}
					}
				});
				
				
			
		},"Actions")
		frm.calc_total(frm)
		frm.copy_discount(frm)
	
	},
	property_price:function(frm){
		frm.calc_total(frm)
	},
	discount:function(frm){
		frm.copy_discount(frm)
		frm.calc_total(frm)

	}
});

frappe.ui.form.on('Property Amenity Detail',{
	
	amenity:function(frm,cdt,cdn){
		let row=locals[cdt][cdn]
		frm.check_amenities_duplicate(frm,row)
		frm.check_flat_against_outdoor_kitchen(frm,row)
		frm.calc_total(frm)
		// console.log(row.name);
	},
	amenities_remove:function(frm,cdt,cdn){
		frm.calc_total(frm)
	},
	qty:function(frm,cdt,cdn){
		let row=locals[cdt][cdn]
		get_amount_for_amenity(frm,row)
	}
})



function get_amount_for_amenity(frm,row) {
	let total_cost=0
	frm.doc.amenities.forEach(item=>{
		if(item.qty!=0){
			row.amount=(row.qty*row.price)
			frm.refresh_field('amenities');
			total_cost+=(item.qty*item.price)
		}
	})
	msgprint(`hello ur Qty is ${total_cost}`)
}