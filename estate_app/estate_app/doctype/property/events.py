import frappe
from estate_app.utils import send_email

def validate(doc,event):
    # print(f"\n\n\n\n{doc}, {event}")
    # frappe.throw("error occured")
    pass
def after_insert(doc,event):
    note=frappe.get_doc({
        'doctype':'Note',
        'title':f"{doc.name} Added in {doc.doctype}",
        'public':True,
        'content':doc.description
    })
    note.insert()
    frappe.db.commit()
    frappe.msgprint(f"{note.title} has been created. ")

    # send mail 
    # doc , recipients,msg,title,attachments=None
    agent_email=frappe.get_doc('Agent',doc.agent)
    msg=f"Hello <b> MR {doc.get_agent_name} </b>, a Property has been created on your behalf. "
    attachment_file=[frappe.attach_print(doc.doctype,doc.name,file_name=doc.name),]
    send_email(doc,[agent_email,'kinddark412@gmail.com'],msg,'New Property')