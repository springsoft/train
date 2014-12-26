/// <summary>
///Message 的摘要说明
public class Message
{
    public Message() { }
    public Message(bool success)
    {
        this.success = success;
    }
    public Message(bool success, string message)
    {
        this.success = success;
        this.message = message;
    }
    public bool success { get; set; }
    public string message { get; set; }
}