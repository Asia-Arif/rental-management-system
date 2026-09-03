const cron = require("node-cron");
const Property = require("../models/Property");
const { BrevoClient } = require("@getbrevo/brevo");

// =====================================================
// FORMAT DATE
// =====================================================
const formatDate = (date) => {
    if (!date) {
        return "Not set";
    }

    return new Date(date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

// =====================================================
// GET DATE ONLY
// =====================================================
const getDateOnly = (date) => {
    const d = new Date(date);

    return new Date(
        d.getFullYear(),
        d.getMonth(),
        d.getDate()
    );
};

// =====================================================
// GET DIFFERENCE IN DAYS
// =====================================================
const getDaysDifference = (date1, date2) => {
    const oneDay = 24 * 60 * 60 * 1000;

    return Math.round(
        (date2.getTime() - date1.getTime()) / oneDay
    );
};

// =====================================================
// SEND RENT REMINDER EMAIL
// =====================================================
const sendRentReminderEmail = async ({
    tenantEmail,
    tenantName,
    propertyName,
    rent,
    dueDate,
    reminderType,
}) => {
    try {
        if (!process.env.BREVO_API_KEY) {
            console.error(
                "BREVO_API_KEY is missing in .env"
            );

            return false;
        }

        if (!process.env.BREVO_SENDER_EMAIL) {
            console.error(
                "BREVO_SENDER_EMAIL is missing in .env"
            );

            return false;
        }

        if (!tenantEmail) {
            console.error(
                "Tenant email is missing."
            );

            return false;
        }

        const brevo = new BrevoClient({
            apiKey: process.env.BREVO_API_KEY,
        });

        let subject = "";
        let textContent = "";

        // =================================================
        // 2 DAYS BEFORE DUE DATE
        // =================================================
        if (reminderType === "BeforeDue") {
            subject =
                "RentEase - Rent Due Date Reminder";

            textContent = `Hello ${tenantName || "Tenant"},

This is a friendly reminder from RentEase.

Your rent payment of Rs. ${Number(
                rent
            ).toLocaleString()} for "${propertyName}" is due in 2 days.

Rent Due Date: ${formatDate(dueDate)}

Please make sure to submit your rent payment on time.

Thank you,
RentEase`;
        }

        // =================================================
        // OVERDUE
        // =================================================
        if (reminderType === "Overdue") {
            subject =
                "RentEase - Rent Payment Overdue";

            textContent = `Hello ${tenantName || "Tenant"},

Your rent payment for "${propertyName}" is overdue.

Rent Amount: Rs. ${Number(
                rent
            ).toLocaleString()}

Due Date: ${formatDate(dueDate)}

Our records show that your rent payment has not yet been approved.

Please submit your rent payment as soon as possible.

You will continue receiving this reminder until your payment is approved.

Thank you,
RentEase`;
        }

        const result =
            await brevo.transactionalEmails.sendTransacEmail({
                sender: {
                    name:
                        process.env.BREVO_SENDER_NAME ||
                        "RentEase",

                    email:
                        process.env.BREVO_SENDER_EMAIL,
                },

                to: [
                    {
                        email: tenantEmail,
                        name: tenantName || "Tenant",
                    },
                ],

                subject,

                textContent,
            });

        console.log(
            "Rent reminder email sent successfully."
        );

        console.log(
            "Tenant Email:",
            tenantEmail
        );

        console.log(
            "Reminder Type:",
            reminderType
        );

        console.log(
            "Brevo Message ID:",
            result?.messageId || "No message ID"
        );

        return true;
    } catch (error) {
        console.error(
            "Rent reminder email error:",
            error?.message || error
        );

        return false;
    }
};

// =====================================================
// CHECK RENT REMINDERS
// =====================================================
const checkRentReminders = async () => {
    try {
        console.log(
            "=========================================="
        );

        console.log(
            "Checking rent reminders..."
        );

        const properties = await Property.find({
            tenant: { $ne: null },
            rentDueDate: { $ne: null },
            status: "Occupied",
        }).populate(
            "tenant",
            "name email"
        );

        if (!properties.length) {
            console.log(
                "No occupied properties with due dates found."
            );

            return;
        }

        const today = getDateOnly(new Date());

        for (const property of properties) {
            try {
                if (!property.tenant) {
                    continue;
                }

                const tenantEmail =
                    property.tenant.email;

                const tenantName =
                    property.tenant.name;

                if (!tenantEmail) {
                    console.log(
                        `Skipping ${property.name}: tenant email not found.`
                    );

                    continue;
                }

                const dueDate =
                    getDateOnly(
                        property.rentDueDate
                    );

                const daysUntilDue =
                    getDaysDifference(
                        today,
                        dueDate
                    );

                console.log(
                    `Property: ${property.name}`
                );

                console.log(
                    `Today: ${formatDate(today)}`
                );

                console.log(
                    `Due Date: ${formatDate(property.rentDueDate)}`
                );

                console.log(
                    `Days Until Due: ${daysUntilDue}`
                );

                // =================================================
                // 2 DAYS BEFORE DUE DATE
                // =================================================
                if (daysUntilDue === 2) {
                    const alreadySent =
                        property.lastRentReminderDate &&
                        getDateOnly(
                            property.lastRentReminderDate
                        ).getTime() ===
                            today.getTime() &&
                        property.lastRentReminderType ===
                            "BeforeDue";

                    if (alreadySent) {
                        console.log(
                            `2-day reminder already sent for ${property.name}`
                        );

                        continue;
                    }

                    const sent =
                        await sendRentReminderEmail({
                            tenantEmail,
                            tenantName,
                            propertyName:
                                property.name,
                            rent: property.rent,
                            dueDate:
                                property.rentDueDate,
                            reminderType:
                                "BeforeDue",
                        });

                    if (sent) {
                        property.lastRentReminderDate =
                            new Date();

                        property.lastRentReminderType =
                            "BeforeDue";

                        await property.save();

                        console.log(
                            `Reminder tracking saved for ${property.name}`
                        );
                    }

                    continue;
                }

                // =================================================
                // AFTER DUE DATE = OVERDUE
                // =================================================
                if (daysUntilDue < 0) {
                    const alreadySentToday =
                        property.lastRentReminderDate &&
                        getDateOnly(
                            property.lastRentReminderDate
                        ).getTime() ===
                            today.getTime() &&
                        property.lastRentReminderType ===
                            "Overdue";

                    if (alreadySentToday) {
                        console.log(
                            `Overdue reminder already sent today for ${property.name}`
                        );

                        continue;
                    }

                    const sent =
                        await sendRentReminderEmail({
                            tenantEmail,
                            tenantName,
                            propertyName:
                                property.name,
                            rent: property.rent,
                            dueDate:
                                property.rentDueDate,
                            reminderType:
                                "Overdue",
                        });

                    if (sent) {
                        property.lastRentReminderDate =
                            new Date();

                        property.lastRentReminderType =
                            "Overdue";

                        await property.save();

                        console.log(
                            `Overdue reminder tracking saved for ${property.name}`
                        );
                    }
                }
            } catch (propertyError) {
                console.error(
                    `Reminder error for property ${property.name}:`,
                    propertyError.message
                );
            }
        }

        console.log(
            "Rent reminder check completed."
        );

        console.log(
            "=========================================="
        );
    } catch (error) {
        console.error(
            "Rent reminder service error:",
            error.message
        );
    }
};

// =====================================================
// START RENT REMINDER CRON JOB
// =====================================================
const startRentReminderService = () => {
    console.log(
        "Rent reminder cron job started."
    );

    // =================================================
    // DAILY RENT REMINDER
    // Runs every day at 9:00 AM Pakistan time
    // =================================================
    cron.schedule(
        "0 9 * * *",
        async () => {
            console.log(
                "Rent reminder cron job running..."
            );

            await checkRentReminders();
        },
        {
            timezone: "Asia/Karachi",
        }
    );
};

// =====================================================
// EXPORT
// =====================================================
module.exports = {
    startRentReminderService,
    checkRentReminders,
};