import xlrd
import pymysql

book = xlrd.open_workbook(sys.argv[0])
sheet_names = book.sheet_names()
sheet = book.sheet_by_name(sheet_names[0])



