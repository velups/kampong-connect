Business Requirements Document
Project Name: Kampong Connect (Community Circle)
 Version: 1.0
 Date: 2 September 2025
 Prepared By: [Your Organization Name]

1. 🎯 Purpose
Kampong Connect is a Web application designed to address the challenges of Singapore’s aging population by fostering meaningful connections between elderly individuals (“Elders”) and community volunteers (“Volunteers”). The app facilitates assistance with daily tasks and companionship, promoting a modern kampong spirit of care and inclusion.
Singapore has an aging population with many Elderly living alone and isolated from their communities.  This initiative aims to bridge the gap between the young and the old.  THis will benefit society by improving mental health and well being.

2. 📍 Scope
This BRD outlines the core functional and non-functional requirements for the Kampong Connect web application, including:
●User registration and profile management
●Request and offer matching system
●Communication and safety features
●Multilingual and accessibility support
●Performance, security, and reliability standards

3. 🎯 Business Objectives
●Reduce social isolation and loneliness among elderly Singaporeans
●Provide a safe and reliable platform for requesting and offering help
●Empower volunteers to contribute meaningfully to their communities
●Strengthen intergenerational bonds and community resilience
●Ensure accessibility for users with limited digital literacy or impairments

4. 👥 Stakeholders
Stakeholder Group	Role & Responsibility
Elderly Individuals	Primary users seeking assistance and companionship
Volunteers	Community members offering time and support
Government Agencies (e.g. MSF)	Oversight, funding, and outreach
Community Centers, Schools & NGOs	Volunteer recruitment and onboarding
Development Team	Design, build, and maintain the application


5. 🧩 Functional Requirements
5.1 User Roles
●Elder: Posts requests for help or companionship
●Volunteer: Browses and accepts requests to assist

5.2 Registration & Profile Management
Feature	Description
Onboarding	Guided setup for both user types
Profile Creation	Name, profile picture, biography, languages (English, Mandarin, Malay, Tamil)
Elder-Specific	Needs (e.g., errands, clinic visits, coffee chat, health walks), preferred communication
Volunteer-Specific	Services offered, availability, location
Verification	Username and password OR Singpass.
Language Selection	English or Mandarin

5.3 Request & Matching System
Feature	Description
Request Creation	Elders specify type of help, date/time, location, and details via text, voice, or image
Request Types	General Assistance, Household Chores, Shopping, Conversation, play games, walks
Matching Algorithm	Based on proximity, availability, and service compatibility
Request Management	Elders can view, cancel, or accept volunteer offers; Volunteers browse and accept requests

5.4 Communication & Safety
Feature	Description
In-App Chat	Secure messaging post-match; contact info hidden until mutual consent
Ratings & Reviews	Mutual feedback after task completion (1 to 5 rating)
Emergency Contact	Optional contact for safety alerts (family member, age care facility)
Report Function	Easy reporting of inappropriate behavior or concerns

6. ⚙️ Non-Functional Requirements
6.1 Performance
●App response time: ≤ 3 seconds
●Scalable architecture for growing user base
6.2 Security
●End-to-end encryption of user data
●PDPA compliance for data privacy
6.3 Accessibility & Usability
●Bilingual interface (English & Mandarin)
●Support for text, voice, and image input
●Large fonts, high-contrast UI for visually impaired users
●Simple navigation for low digital literacy, the app has to be simple and easy to use
6.4 Reliability
●Minimum uptime: 99.9%
●Offline mode: Cached data and queued actions

7. 🧠 Assumptions & Constraints
Assumptions
●Adequate volunteer participation
●Government and NGO support for outreach
●Smartphone access among elderly users
Constraints
●Budget and timeline limitations
●Compliance with Singaporean laws and PDPA
●Initial release limited to core features

8. 🔮 Future Considerations
●Group Activities: Volunteer-led events
●Service Tiers: Paid professional caregiving options
●Integration: Transport and healthcare services
●Gamification: Points, badges, leaderboards for volunteers

9. 🧭 User Journeys
Elderly Users
1.Sign up with Name, Age, NRIC (private), Username (always email address)
2.Create profile with optional disability info
3.Post “Assistance” request:
○ General Assistance (e.g., grocery help, doctors appointments)
○Household Chores (e.g., cleaning, cooking)
○Wellbeing (e.g., coffee, walk, chat, play board games, sit watch movie)
○Specify time/date/duration
4.View volunteer offers and accept one
5.Review volunteer after task completion

Volunteers
1.Sign up with Name, NRIC, Address
2.Browse posted Assistance requests
3.Request to accept a job
4.Wait for Elder’s approval
5.Review Elder after task completion
