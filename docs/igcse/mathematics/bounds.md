---
title: "Lower and Upper Bounds"
sidebar_position: 1
tags: [maths, bounds]
description: "Complete notes on the lower and upper bounds"
---

### **🔍 What Are Bounds?**

When a value is **rounded or truncated**, it is no longer exact. The **lower bound** and **upper bound** show the **range** within which the actual value lies.

### **🧮 Key Concepts**

#### **1\. Rounding to the Nearest Whole Number / Decimal / Significant Figure**

- When a value is **rounded**, it could be slightly **less or more** than the rounded value.

- The **range** of possible values is from:

  - **Lower Bound** \= rounded value − half the degree of accuracy

  - **Upper Bound** \= rounded value \+ half the degree of accuracy

### **✅ How to Find Bounds**

| Rounding To | Step Size | Lower Bound         | Upper Bound         |
| ----------- | --------- | ------------------- | ------------------- |
| Nearest 10  | 10        | value − 5           | value \+ 5          |
| 1 dp        | 0.1       | value − 0.05        | value \+ 0.05       |
| 2 sf        | Depends   | Half the unit place | Half the unit place |

📝 **Example:**  
 If a length is **12.4 cm** (rounded to 1 decimal place):

- Step size \= 0.1

- Lower bound \= 12.4 − 0.05 \= **12.35 cm**
- Upper bound \= 12.4 \+ 0.05 \= **12.45 cm**

## **➕ Calculations with Bounds**

### **⚠️ Important Rule:**

- **Addition/Subtraction**: Use **extreme combinations** to find **min and max possible results**.

- **Multiplication/Division**: Use **extreme combinations** that **increase or decrease** the result as much as possible.

### **➕ 1\. Addition**

Use **lower \+ lower** for the smallest result  
Use **upper \+ upper** for the largest result

📝 **Example:**  
 Length A \= 5.3 m (±0.05) ⇒ LB \= 5.25, UB \= 5.35  
 Length B \= 2.6 m (±0.05) ⇒ LB \= 2.55, UB \= 2.65

- **Min total** \= 5.25 \+ 2.55 \= **7.80 m**

- **Max total** \= 5.35 \+ 2.65 \= **8.00 m**

### **➖ 2\. Subtraction**

Use **lower − upper** for the smallest result  
Use **upper − lower** for the largest result

📝 **Example:**  
 A \= 8.1 cm (±0.05) ⇒ LB \= 8.05, UB \= 8.15  
 B \= 3.4 cm (±0.05) ⇒ LB \= 3.35, UB \= 3.45

- **Min difference** \= 8.05 − 3.45 \= **4.60 cm**
- **Max difference** \= 8.15 − 3.35 \= **4.80 cm**

### **✖️ 3\. Multiplication**

Use **lower × lower** for the smallest result  
Use **upper × upper** for the largest result

📝 **Example:**  
 Length \= 4.2 m (±0.05) ⇒ LB \= 4.15, UB \= 4.25  
 Width \= 1.8 m (±0.05) ⇒ LB \= 1.75, UB \= 1.85

- **Min area** \= 4.15 × 1.75 \= **7.26 m²**

- **Max area** \= 4.25 × 1.85 \= **7.86 m²**

### **➗ 4\. Division**

Use **lower ÷ upper** for the smallest result  
 Use **upper ÷ lower** for the largest result

📝 **Example:**  
 Distance \= 120 km (±0.5) ⇒ LB \= 119.5, UB \= 120.5  
 Time \= 2 h (±0.05) ⇒ LB \= 1.95, UB \= 2.05

- **Min speed** \= 119.5 ÷ 2.05 \= **≈ 58.29 km/h**

- **Max speed** \= 120.5 ÷ 1.95 \= **≈ 61.79 km/h**

## **✨ Summary Table**

| Operation      | Min Value (Lower Bound) | Max Value (Upper Bound) |
| -------------- | ----------------------- | ----------------------- |
| Addition       | LB \+ LB                | UB \+ UB                |
| Subtraction    | LB − UB                 | UB − LB                 |
| Multiplication | LB × LB                 | UB × UB                 |
| Division       | LB ÷ UB                 | UB ÷ LB                 |

## **🧠 Quick Tip:**

Always **identify the degree of accuracy first** (nearest 0.1, 1, 10, etc.) and calculate the bounds **before** doing any operations.
