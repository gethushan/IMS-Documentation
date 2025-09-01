// Comprehensive API Documentation Data for IMS
const completeApiData = {
  Authentication: {
    description: "User authentication, registration, and profile management",
    endpoints: [
      {
        method: "POST",
        path: "/api/auth/register",
        title: "Register User",
        description: "Register a new user account with email verification",
        details: {
          "Request Body": {
            username: "string (required)",
            email: "string (required)",
            fullName: "string (required)",
            nameWithInitials: "string (required)",
            password: "string (required)",
            userType: "string (required) - 'individual' or 'institute'",
            postalAddress: "string",
            contactNumber: "string",
            nic: "string",
            district: "string",
            preferredLanguage: "string",
            instituteContactNumber: "string",
            instituteContactEmail: "string",
            instituteName: "string",
            department: "string",
            instituteType: "string",
          },
          Response: {
            200: {
              message:
                "Verification code sent. Please check your email to complete registration.",
              requiresVerification: true,
            },
            400: {
              message: "User with this email or username already exists",
            },
          },
        },
      },
      {
        method: "POST",
        path: "/api/auth/login",
        title: "Login User",
        description: "Authenticate user and return JWT token",
        details: {
          "Request Body": {
            email: "string (required)",
            password: "string (required)",
          },
          Response: {
            200: {
              token: "JWT_TOKEN",
              user: {
                id: "user_id",
                username: "string",
                email: "string",
                fullName: "string",
                userType: "string",
              },
            },
            401: {
              message: "Invalid credentials",
            },
          },
        },
      },
      {
        method: "GET",
        path: "/api/auth/profile",
        title: "Get User Profile",
        description: "Get current user's profile information",
        details: {
          Headers: {
            Authorization: "Bearer JWT_TOKEN (required)",
          },
          Response: {
            200: {
              user: {
                id: "user_id",
                username: "string",
                email: "string",
                fullName: "string",
                userType: "string",
                profileImage: "string (URL)",
              },
            },
            401: {
              message: "Access denied",
            },
          },
        },
      },
      {
        method: "PUT",
        path: "/api/auth/profile",
        title: "Update User Profile",
        description: "Update user profile information and profile image",
        details: {
          Headers: {
            Authorization: "Bearer JWT_TOKEN (required)",
          },
          "Request Body": {
            fullName: "string",
            contactNumber: "string",
            postalAddress: "string",
            profileImage: "file (optional)",
          },
          Response: {
            200: {
              message: "Profile updated successfully",
              user: "updated_user_object",
            },
          },
        },
      },
      {
        method: "POST",
        path: "/api/auth/request-password-reset-otp",
        title: "Request Password Reset OTP",
        description: "Request OTP for password reset",
        details: {
          "Request Body": {
            email: "string (required)",
          },
          Response: {
            200: {
              message: "OTP sent to your email",
            },
            404: {
              message: "User not found",
            },
          },
        },
      },
      {
        method: "POST",
        path: "/api/auth/verify-otp-reset-password",
        title: "Verify OTP and Reset Password",
        description: "Verify OTP and set new password",
        details: {
          "Request Body": {
            email: "string (required)",
            otp: "string (required)",
            newPassword: "string (required)",
          },
          Response: {
            200: {
              message: "Password reset successfully",
            },
            400: {
              message: "Invalid OTP",
            },
          },
        },
      },
    ],
  },
  "CV Management": {
    description: "CV creation, approval, and management operations",
    endpoints: [
      {
        method: "POST",
        path: "/api/cvs/addcv",
        title: "Create CV",
        description: "Create a new CV with file uploads",
        details: {
          Headers: {
            Authorization: "Bearer JWT_TOKEN (required)",
          },
          "Request Body": {
            fullName: "string (required)",
            nic: "string (required)",
            email: "string (required)",
            contactNumber: "string (required)",
            cvFile: "file (required)",
            certificateFile: "file (optional)",
            otherDocuments: "files (optional)",
          },
          Response: {
            201: {
              message: "CV created successfully",
              cv: "cv_object",
            },
            400: {
              message: "Validation error",
            },
          },
        },
      },
      {
        method: "GET",
        path: "/api/cvs/mycvs",
        title: "Get User CVs",
        description: "Get all CVs for the authenticated user",
        details: {
          Headers: {
            Authorization: "Bearer JWT_TOKEN (required)",
          },
          Response: {
            200: {
              cvs: [
                {
                  id: "cv_id",
                  fullName: "string",
                  status: "string",
                  createdAt: "date",
                },
              ],
            },
          },
        },
      },
      {
        method: "GET",
        path: "/api/cvs/get-all-with-filtering",
        title: "Get All CVs with Filtering",
        description: "Get all CVs with optional filtering",
        details: {
          "Query Parameters": {
            status: "string (optional) - approved, pending, declined",
            page: "number (optional)",
            limit: "number (optional)",
          },
          Response: {
            200: {
              cvs: "array_of_cv_objects",
              totalPages: "number",
              currentPage: "number",
            },
          },
        },
      },
      {
        method: "POST",
        path: "/api/cvs/:id/approve",
        title: "Approve CV",
        description: "Approve a CV for further processing",
        details: {
          Headers: {
            Authorization: "Bearer JWT_TOKEN (required)",
          },
          Response: {
            200: {
              message: "CV approved successfully",
            },
          },
        },
      },
      {
        method: "POST",
        path: "/api/cvs/:id/decline",
        title: "Decline CV",
        description: "Decline a CV with optional reason",
        details: {
          Headers: {
            Authorization: "Bearer JWT_TOKEN (required)",
          },
          "Request Body": {
            reason: "string (optional)",
          },
          Response: {
            200: {
              message: "CV declined successfully",
            },
          },
        },
      },
      {
        method: "PATCH",
        path: "/api/cvs/:id/schedule-interview",
        title: "Schedule Interview for CV",
        description: "Schedule an interview for a specific CV",
        details: {
          Headers: {
            Authorization: "Bearer JWT_TOKEN (required)",
          },
          "Request Body": {
            interviewId: "string (required)",
            scheduledDate: "date (required)",
            scheduledTime: "string (required)",
          },
          Response: {
            200: {
              message: "Interview scheduled successfully",
            },
          },
        },
      },
      {
        method: "POST",
        path: "/api/cvs/:id/pass-interview",
        title: "Pass Interview",
        description: "Mark CV as passed interview",
        details: {
          Headers: {
            Authorization: "Bearer JWT_TOKEN (required)",
          },
          Response: {
            200: {
              message: "Interview passed successfully",
            },
          },
        },
      },
      {
        method: "POST",
        path: "/api/cvs/:id/fail-interview",
        title: "Fail Interview",
        description: "Mark CV as failed interview",
        details: {
          Headers: {
            Authorization: "Bearer JWT_TOKEN (required)",
          },
          "Request Body": {
            reason: "string (optional)",
          },
          Response: {
            200: {
              message: "Interview failed",
            },
          },
        },
      },
      {
        method: "PATCH",
        path: "/api/cvs/:id/assign-induction",
        title: "Assign Induction",
        description: "Assign induction to a CV",
        details: {
          Headers: {
            Authorization: "Bearer JWT_TOKEN (required)",
          },
          "Request Body": {
            inductionId: "string (required)",
            scheduledDate: "date (required)",
          },
          Response: {
            200: {
              message: "Induction assigned successfully",
            },
          },
        },
      },
      {
        method: "PATCH",
        path: "/api/cvs/:id/pass-induction",
        title: "Pass Induction",
        description: "Mark CV as passed induction",
        details: {
          Headers: {
            Authorization: "Bearer JWT_TOKEN (required)",
          },
          Response: {
            200: {
              message: "Induction passed successfully",
            },
          },
        },
      },
      {
        method: "PATCH",
        path: "/api/cvs/:id/fail-induction",
        title: "Fail Induction",
        description: "Mark CV as failed induction",
        details: {
          Headers: {
            Authorization: "Bearer JWT_TOKEN (required)",
          },
          "Request Body": {
            reason: "string (optional)",
          },
          Response: {
            200: {
              message: "Induction failed",
            },
          },
        },
      },
      {
        method: "POST",
        path: "/api/cvs/:id/assign-scheme",
        title: "Assign Scheme",
        description: "Assign a scheme to a CV",
        details: {
          Headers: {
            Authorization: "Bearer JWT_TOKEN (required)",
          },
          "Request Body": {
            schemeId: "string (required)",
          },
          Response: {
            200: {
              message: "Scheme assigned successfully",
            },
          },
        },
      },
      {
        method: "DELETE",
        path: "/api/cvs/:id",
        title: "Soft Delete CV",
        description: "Soft delete a CV (mark as deleted)",
        details: {
          Headers: {
            Authorization: "Bearer JWT_TOKEN (required)",
          },
          Response: {
            200: {
              message: "CV deleted successfully",
            },
          },
        },
      },
      {
        method: "POST",
        path: "/api/cvs/deleted/:id/restore",
        title: "Restore CV",
        description: "Restore a soft-deleted CV",
        details: {
          Headers: {
            Authorization: "Bearer JWT_TOKEN (required)",
          },
          Response: {
            200: {
              message: "CV restored successfully",
            },
          },
        },
      },
    ],
  },
  "Interview Management": {
    description: "Interview scheduling and management",
    endpoints: [
      {
        method: "POST",
        path: "/api/interviews",
        title: "Create Interview",
        description: "Create a new interview session",
        details: {
          "Request Body": {
            title: "string (required)",
            date: "date (required)",
            time: "string (required)",
            location: "string (required)",
            maxParticipants: "number (optional)",
            description: "string (optional)",
          },
          Response: {
            201: {
              message: "Interview created successfully",
              interview: {
                id: "interview_id",
                title: "string",
                date: "date",
                time: "string",
                location: "string",
                maxParticipants: "number",
                status: "scheduled",
              },
            },
          },
        },
      },
      {
        method: "GET",
        path: "/api/interviews",
        title: "Get All Interviews",
        description: "Get all non-deleted interviews",
        details: {
          Response: {
            200: {
              interviews: [
                {
                  id: "interview_id",
                  title: "string",
                  date: "date",
                  time: "string",
                  location: "string",
                  status: "string",
                  participantCount: "number",
                },
              ],
            },
          },
        },
      },
      {
        method: "GET",
        path: "/api/interviews/:id",
        title: "Get Interview by ID",
        description: "Get specific interview details",
        details: {
          Response: {
            200: {
              interview: "interview_object_with_details",
            },
            404: {
              message: "Interview not found",
            },
          },
        },
      },
      {
        method: "PUT",
        path: "/api/interviews/:id",
        title: "Update Interview",
        description: "Update interview details",
        details: {
          "Request Body": {
            title: "string (optional)",
            date: "date (optional)",
            time: "string (optional)",
            location: "string (optional)",
            maxParticipants: "number (optional)",
          },
          Response: {
            200: {
              message: "Interview updated successfully",
              interview: "updated_interview_object",
            },
          },
        },
      },
      {
        method: "DELETE",
        path: "/api/interviews/:id",
        title: "Delete Interview",
        description: "Soft delete an interview",
        details: {
          Response: {
            200: {
              message: "Interview deleted successfully",
            },
          },
        },
      },
      {
        method: "PATCH",
        path: "/api/interviews/:id/restore",
        title: "Restore Interview",
        description: "Restore a deleted interview",
        details: {
          Response: {
            200: {
              message: "Interview restored successfully",
            },
          },
        },
      },
      {
        method: "GET",
        path: "/api/interviews/:id/interns",
        title: "Get Interns by Interview",
        description: "Get all interns assigned to an interview",
        details: {
          Response: {
            200: {
              interns: [
                {
                  id: "intern_id",
                  fullName: "string",
                  nic: "string",
                  status: "string",
                },
              ],
            },
          },
        },
      },
    ],
  },
  "Certificate Management": {
    description: "Certificate request and management",
    endpoints: [
      {
        method: "POST",
        path: "/api/certificates/create",
        title: "Create Certificate Request",
        description: "Create a new certificate request",
        details: {
          Headers: {
            Authorization: "Bearer JWT_TOKEN (required)",
          },
          "Request Body": {
            traineeName: "string (required)",
            nic: "string (required)",
            trainingProgram: "string (required)",
            completionDate: "date (required)",
            traineeSignature: "file (required)",
          },
          Response: {
            201: {
              message: "Certificate request created successfully",
              certificate: "certificate_object",
            },
          },
        },
      },
      {
        method: "GET",
        path: "/api/certificates/user-certificates",
        title: "Get User Certificates",
        description: "Get all certificates for the authenticated user",
        details: {
          Headers: {
            Authorization: "Bearer JWT_TOKEN (required)",
          },
          Response: {
            200: {
              certificates: [
                {
                  id: "certificate_id",
                  traineeName: "string",
                  trainingProgram: "string",
                  status: "string",
                  createdAt: "date",
                },
              ],
            },
          },
        },
      },
      {
        method: "GET",
        path: "/api/certificates/all-requests",
        title: "Get All Certificate Requests",
        description: "Get all certificate requests (staff only)",
        details: {
          Headers: {
            Authorization: "Bearer JWT_TOKEN (required)",
          },
          Response: {
            200: {
              certificates: "array_of_certificate_objects",
            },
          },
        },
      },
      {
        method: "PUT",
        path: "/api/certificates/update-status/:id",
        title: "Update Certificate Status",
        description: "Update certificate request status",
        details: {
          Headers: {
            Authorization: "Bearer JWT_TOKEN (required)",
          },
          "Request Body": {
            status: "string (required) - approved, rejected, pending",
          },
          Response: {
            200: {
              message: "Certificate status updated successfully",
            },
          },
        },
      },
    ],
  },
  "Staff Management": {
    description: "Staff member management and operations",
    endpoints: [
      {
        method: "GET",
        path: "/api/staff",
        title: "Get All Staff",
        description: "Get all staff members (requires authentication)",
        details: {
          Headers: {
            Authorization: "Bearer JWT_TOKEN (required)",
          },
          Response: {
            200: {
              staff: [
                {
                  id: "staff_id",
                  name: "string",
                  email: "string",
                  role: "string",
                  department: "string",
                },
              ],
            },
          },
        },
      },
      {
        method: "POST",
        path: "/api/staff",
        title: "Add Staff Member",
        description: "Add a new staff member (requires staff privileges)",
        details: {
          Headers: {
            Authorization: "Bearer JWT_TOKEN (required)",
          },
          "Request Body": {
            name: "string (required)",
            email: "string (required)",
            role: "string (required)",
            department: "string (required)",
          },
          Response: {
            201: {
              message: "Staff member added successfully",
              staff: "staff_object",
            },
          },
        },
      },
      {
        method: "GET",
        path: "/api/staff/:id",
        title: "Get Staff by ID",
        description: "Get specific staff member details",
        details: {
          Headers: {
            Authorization: "Bearer JWT_TOKEN (required)",
          },
          Response: {
            200: {
              staff: "staff_object",
            },
            404: {
              message: "Staff member not found",
            },
          },
        },
      },
      {
        method: "PUT",
        path: "/api/staff/:id",
        title: "Update Staff Member",
        description: "Update staff member information",
        details: {
          Headers: {
            Authorization: "Bearer JWT_TOKEN (required)",
          },
          "Request Body": {
            name: "string (optional)",
            email: "string (optional)",
            role: "string (optional)",
            department: "string (optional)",
          },
          Response: {
            200: {
              message: "Staff member updated successfully",
              staff: "updated_staff_object",
            },
          },
        },
      },
      {
        method: "DELETE",
        path: "/api/staff/:id",
        title: "Delete Staff Member",
        description: "Delete a staff member",
        details: {
          Headers: {
            Authorization: "Bearer JWT_TOKEN (required)",
          },
          Response: {
            200: {
              message: "Staff member deleted successfully",
            },
          },
        },
      },
    ],
  },
  "Placement Reports": {
    description: "Placement report creation and management",
    endpoints: [
      {
        method: "POST",
        path: "/api/placement/report",
        title: "Create Placement Report",
        description: "Create a new placement report",
        details: {
          "Request Body": {
            internName: "string (required)",
            nic: "string (required)",
            placementDate: "date (required)",
            placementLocation: "string (required)",
            supervisorName: "string (required)",
            reportDetails: "string (required)",
          },
          Response: {
            201: {
              message: "Placement report created successfully",
              report: "placement_report_object",
            },
          },
        },
      },
    ],
  },
  Statistics: {
    description: "System statistics and analytics",
    endpoints: [
      {
        method: "GET",
        path: "/api/stats",
        title: "Get System Statistics",
        description: "Get overall system statistics",
        details: {
          Response: {
            200: {
              totalUsers: "number",
              totalCVs: "number",
              approvedCVs: "number",
              pendingCVs: "number",
              totalInterviews: "number",
              totalCertificates: "number",
              totalStaff: "number",
            },
          },
        },
      },
    ],
  },
  "Email Services": {
    description: "Email sending and management",
    endpoints: [
      {
        method: "POST",
        path: "/api/emails/send",
        title: "Send Email",
        description: "Send email notifications",
        details: {
          "Request Body": {
            to: "string (required)",
            subject: "string (required)",
            content: "string (required)",
            template: "string (optional)",
          },
          Response: {
            200: {
              message: "Email sent successfully",
            },
          },
        },
      },
    ],
  },
  "Bank Details": {
    description: "Bank account information management",
    endpoints: [
      {
        method: "POST",
        path: "/api/bankDetails",
        title: "Add Bank Details",
        description: "Add bank account information",
        details: {
          Headers: {
            Authorization: "Bearer JWT_TOKEN (required)",
          },
          "Request Body": {
            accountHolderName: "string (required)",
            accountNumber: "string (required)",
            bankName: "string (required)",
            branchName: "string (required)",
            nic: "string (required)",
          },
          Response: {
            201: {
              message: "Bank details added successfully",
              bankDetails: "bank_details_object",
            },
          },
        },
      },
    ],
  },
  Districts: {
    description: "District information management",
    endpoints: [
      {
        method: "GET",
        path: "/api/districts",
        title: "Get All Districts",
        description: "Get list of all districts",
        details: {
          Response: {
            200: {
              districts: [
                {
                  id: "district_id",
                  name: "string",
                  code: "string",
                },
              ],
            },
          },
        },
      },
    ],
  },
  Institutes: {
    description: "Institute information management",
    endpoints: [
      {
        method: "GET",
        path: "/api/institutes",
        title: "Get All Institutes",
        description: "Get list of all institutes",
        details: {
          Response: {
            200: {
              institutes: [
                {
                  id: "institute_id",
                  name: "string",
                  type: "string",
                  location: "string",
                },
              ],
            },
          },
        },
      },
    ],
  },
  Universities: {
    description: "University information management",
    endpoints: [
      {
        method: "GET",
        path: "/api/universities",
        title: "Get All Universities",
        description: "Get list of all universities",
        details: {
          Response: {
            200: {
              universities: [
                {
                  id: "university_id",
                  name: "string",
                  location: "string",
                  type: "string",
                },
              ],
            },
          },
        },
      },
    ],
  },
  Chatbot: {
    description: "AI chatbot services",
    endpoints: [
      {
        method: "POST",
        path: "/api/chatbot/chat",
        title: "Chat with Bot",
        description: "Send message to AI chatbot",
        details: {
          "Request Body": {
            message: "string (required)",
            userId: "string (optional)",
          },
          Response: {
            200: {
              response: "string",
              confidence: "number",
            },
          },
        },
      },
    ],
  },
};

// Export for use in HTML file
if (typeof module !== "undefined" && module.exports) {
  module.exports = completeApiData;
} else {
  window.completeApiData = completeApiData;
}
