const buttons = document.querySelectorAll('.btn');
const codeTextarea = document.getElementById('code-textarea');
const copyBtn = document.getElementById('copy-btn');

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        let code = '';
        switch (button.id) {
            case 'passport-btn':
                code = `import sqlite3
from tkinter import *

# Establishing connection and creating cursor
conn = sqlite3.connect('passport_system.db')
c = conn.cursor()

# Create tables if they don't exist
c.execute('''CREATE TABLE IF NOT EXISTS record (name TEXT, email TEXT, phone TEXT, birth TEXT, aadhar TEXT)''')
c.execute('''CREATE TABLE IF NOT EXISTS approved (name TEXT, email TEXT, phone TEXT, birth TEXT, aadhar TEXT)''')
c.execute('''CREATE TABLE IF NOT EXISTS users (username TEXT, password TEXT)''')

# Functions for database operations
def create_record(name, email, phone, birth, aadhar):
    c.execute("INSERT INTO record VALUES (?, ?, ?, ?, ?)", (name, email, phone, birth, aadhar))
    conn.commit()

def approve_all_records():
    c.execute("INSERT INTO approved SELECT * FROM record")
    conn.commit()

def check_credentials(username, password):
    c.execute("SELECT * FROM users WHERE username=? AND password=?", (username, password))
    return c.fetchone() is not None

def record_check():
    c.execute("SELECT * FROM record EXCEPT SELECT * FROM approved")
    return c.fetchall()

def track(name, phone):
    c.execute("SELECT * FROM record WHERE name=? AND phone=?", (name, phone))
    if c.fetchone():
        c.execute("SELECT * FROM approved WHERE name=? AND phone=?", (name, phone))
        status = bool(c.fetchone())
        track_status(status)
    else:
        track_status(None)

def track_status(found):
    track_window = Tk()
    track_window.geometry('200x80')
    track_window.title("Passport Verification Status")
    status_message = "Verification Successful" if found else "Verification Pending" if found == False else "Incorrect Detail, Check your details"
    Label(track_window, text=status_message).pack()
    track_window.mainloop()

def login():
    username, password = e1.get(), e2.get()
    if (username, password) == ('admin', 'admin') or check_credentials(username, password):
        root.destroy()
        admin_window() if username == 'admin' else menu()

def admin_window():
    admin_root = Tk()
    admin_root.geometry('500x300')
    admin_root.title("Admin Panel")
    Label(admin_root, text="Records not approved:").pack()
    records_text = Text(admin_root, height=10, width=60)
    for record in record_check():
        records_text.insert(END, ', '.join(record) + '\\n')
    records_text.pack()
    Button(admin_root, text="Approve All", command=approve_all_records).pack(pady=10)
    admin_root.mainloop()

def create_user(username, password):
    c.execute("INSERT INTO users VALUES (?, ?)", (username, password))
    conn.commit()

def create():
    top = Tk()
    top.geometry("300x350")
    top.title("Adding New Passport")
    fields = [("Name", 50), ("E-Mail", 90), ("Phone", 130), ("Date of Birth", 170), ("Aadhar", 210)]
    entries = {}
    for label, y in fields:
        Label(top, text=label).place(x=30, y=y)
        entry = Entry(top, width=20)
        entry.place(x=140, y=y)
        entries[label] = entry
    Button(top, text="ADD", command=lambda: create_record(*[entries[label].get() for label, _ in fields])).place(x=70, y=280)
    Button(top, text="CLOSE", command=top.destroy).place(x=180, y=280)
    top.mainloop()

def track_page():
    root = Tk()
    root.geometry('300x200')
    root.title("Status Track")
    fields = [("Name", 50), ("Phone Number", 90)]
    entries = {}
    for label, y in fields:
        Label(root, text=label).place(x=30, y=y)
        entry = Entry(root, width=20)
        entry.place(x=140, y=y)
        entries[label] = entry
    Button(root, text="TRACK", command=lambda: track(entries["Name"].get(), entries["Phone Number"].get())).place(x=120, y=150)
    root.mainloop()

def menu():
    t_op = Tk()
    t_op.geometry("250x180")
    t_op.title("Adding New Passport")
    Button(t_op, text="Sign Out", command=lambda: [t_op.destroy(), main_login()]).place(x=193, y=0)
    Button(t_op, text="New Passport", command=lambda: [t_op.destroy(), create()]).place(x=85, y=60)
    Button(t_op, text="Track", command=track_page).place(x=105, y=110)
    t_op.mainloop()

def NEW_USER():
    Root = Tk()
    Root.geometry('300x200')
    Root.title("NEW USER")
    fields = [("User Name", 50), ("Password", 90)]
    entries = {}
    for label, y in fields:
        Label(Root, text=label).place(x=30, y=y)
        entry = Entry(Root, width=20)
        entry.place(x=140, y=y)
        entries[label] = entry
    Button(Root, text="Create", command=lambda: [create_user(entries["User Name"].get(), entries["Password"].get()), Root.destroy()]).place(x=120, y=150)
    Root.mainloop()

def main_login():
    global root, e1, e2
    root = Tk()
    root.geometry('300x200')
    root.title("Passport System")
    fields = [("Name", 50), ("Password", 90)]
    entries = {}
    for label, y in fields:
        Label(root, text=label).place(x=30, y=y)
        entry = Entry(root, width=20, show="*" if label == "Password" else "")
        entry.place(x=140, y=y)
        entries[label] = entry
    e1, e2 = entries["Name"], entries["Password"]
    Button(root, text="SIGN IN", command=login).place(x=60, y=150)
    Button(root, text="SIGN UP", command=NEW_USER).place(x=190, y=150)
    root.mainloop()

main_login()
conn.close()`;
                break;
            case 'exam-reg-btn':
                code = `def add(x, y):
    return x + y

def subtract(x, y):
    return x - y

def multiply(x, y):
    return x * y

def divide(x, y):
    if y == 0:
        return "Error: division by zero"
    return x / y

print("Select operation:")
print("1. Add")
print("2. Subtract")
print("3. Multiply")
print("4. Divide")

choice = input("Enter choice (1/2/3/4): ")
num1 = float(input("Enter first number: "))
num2 = float(input("Enter second number: "))

if choice == '1':
    print(num1, "+", num2, "=", add(num1, num2))
elif choice == '2':
    print(num1, "-", num2, "=", subtract(num1, num2))
elif choice == '3':
    print(num1, "*", num2, "=", multiply(num1, num2))
elif choice == '4':
    print(num1, "/", num2, "=", divide(num1, num2))
else:
    print("Invalid input")`;
                break;
            case 'stock-manage-btn':
                code = `def factorial(n):
    if n == 0:
        return 1
    else:
        return n * factorial(n-1)

num = int(input("Enter a number: "))
print("Factorial of", num, "is", factorial(num))`;
                break;
            case 'online-course-btn':
                code = `def is_palindrome(s):
    return s == s[::-1]

word = input("Enter a word: ")
if is_palindrome(word):
    print("It's a palindrome!")
else:
    print("It's not a palindrome.")`;
                break;
            case 'software-manage-btn':
                code = `def is_prime(n):
    if n <= 1:
        return False
    elif n <= 3:
        return True
    elif n % 2 == 0 or n % 3 == 0:
        return False
    i = 5
    while i * i <= n:
        if n % i == 0 or n % (i + 2) == 0:
            return False
        i += 6
    return True

num = int(input("Enter a number: "))
if is_prime(num):
    print("It's a prime number!")
else:
    print("It's not a prime number.")`;
                break;
            case 'recruitment-btn':
                code = `def fibonacci(n):
    fib_seq = [0, 1]
    for i in range(2, n):
        fib_seq.append(fib_seq[i-1] + fib_seq[i-2])
    return fib_seq

num_terms = int(input("Enter the number of terms: "))
print("Fibonacci sequence:")
print(fibonacci(num_terms))`;
                break;
            case 'conference-btn':
                code = `def celsius_to_fahrenheit(celsius):
    return (celsius * 9/5) + 32

def fahrenheit_to_celsius(fahrenheit):
    return (fahrenheit - 32) * 5/9

choice = input("Choose conversion:\\n1. Celsius to Fahrenheit\\n2. Fahrenheit to Celsius\\nEnter choice (1/2): ")
if choice == '1':
    celsius = float(input("Enter temperature in Celsius: "))
    print("Temperature in Fahrenheit:", celsius_to_fahrenheit(celsius))
elif choice == '2':
    fahrenheit = float(input("Enter temperature in Fahrenheit: "))
    print("Temperature in Celsius:", fahrenheit_to_celsius(fahrenheit))
else:
    print("Invalid choice")`;
                break;
            case 'business-btn':
                code = `def simple_interest(principal, rate, time):
    return (principal * rate * time) / 100

principal = float(input("Enter principal amount: "))
rate = float(input("Enter rate of interest: "))
time = float(input("Enter time period (in years): "))
print("Simple interest:", simple_interest(principal, rate, time))`;
                break;
            case 'library-btn':
                code = `import cmath

def solve_quadratic(a, b, c):
    d = (b**2) - (4*a*c)
    sol1 = (-b-cmath.sqrt(d))/(2*a)
    sol2 = (-b+cmath.sqrt(d))/(2*a)
    return sol1, sol2

a = float(input("Enter coefficient a: "))
b = float(input("Enter coefficient b: "))
c = float(input("Enter coefficient c: "))
sol1, sol2 = solve_quadratic(a, b, c)
print("Solutions:")
print("Solution 1:", sol1)
print("Solution 2:", sol2)`;
                break;
        }
        codeTextarea.value = code;
    });
});

copyBtn.addEventListener('click', () => {
    codeTextarea.select();
    document.execCommand('copy');
    alert('Code copied to clipboard!');
});
