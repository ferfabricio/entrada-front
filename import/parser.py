import csv
import json

csvfile = open('data.csv', 'r')
thisrtfile = open('tshirt.csv', 'r')
jsonfile = open('file.json', 'w')

tshirtFields = ("ticket", "genre", "size", "model")
tshirtReader = csv.DictReader( thisrtfile, fieldnames=tshirtFields)
tshirt = []
for row in tshirtReader:
    tshirt.append(row)

fieldnames = ("name", "email", "payment_status", "ticket", "type", "purchase_date", "credential_date", "cupom", "purchase_id", "genre", "status")
reader = csv.DictReader( csvfile, fieldnames=fieldnames)
ready = []
for row in reader:
    row["status"] = "NAO REALIZADO"
    row["model"] = ""
    row["size"] = ""
    for t in tshirt:
        if t["ticket"] == row["ticket"]:
            row["model"] = t["model"]
            row["size"] = t["size"]
    ready.append(row)

jsonfile.write('{"participants":[')
i = 1
for row in ready:
    row["id"]=i
    i+=1
    json.dump(row, jsonfile)
    jsonfile.write(',\n')
jsonfile.write(']}')