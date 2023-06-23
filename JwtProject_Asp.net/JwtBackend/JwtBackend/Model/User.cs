namespace JwtBackend.Model
{
    public class User
    {
        public Guid UserId { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }
        public string Passsword { get; set; }
        public string Mobilenumber { get; set; }
        public string Gender { get; set; }
        public DateTime MemberSince { get; set; }
    }
}
