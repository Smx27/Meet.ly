namespace API.SignalR;

public class PresenceTracker
{
    private static readonly Dictionary<string, List<string>> OnlineUsers = new Dictionary<string, List<string>>();

    public static Task<bool> UserConnected(string username, string connectionId)
    {
        var isOnline = false;
        lock(OnlineUsers)
        {
            if(OnlineUsers.TryGetValue(username, out var value))
            {
                value.Add(connectionId);
            }
            else {
                OnlineUsers.Add(username, [connectionId]);
                isOnline = true;
            }

            return Task.FromResult(isOnline);
        }
    }
    public static Task<bool> UserDisconnected(string username, string connectionId)
    {
        lock(OnlineUsers)
        {
            if(!OnlineUsers.TryGetValue(username, out List<string> value)) return Task.FromResult(false);
            value.Remove(connectionId);

            if (value.Count != 0) return Task.FromResult(false);
            
            OnlineUsers.Remove(username);

            return Task.FromResult(true);
        }
    }

    public Task<string[]> GetOnlineUsers()
    {
        string [] onlineUsers;
        lock(OnlineUsers)
        {
            onlineUsers = OnlineUsers.OrderBy(k=> k.Key).Select(k=> k.Key).ToArray();
        }

        return Task.FromResult(onlineUsers);
    }
    public static Task<List<string>> GetConnectionsForUser(string username)
    {
        List<string> connectionIds;
        lock(OnlineUsers)
        {
            connectionIds =OnlineUsers.GetValueOrDefault(username);
        }

        return Task.FromResult(connectionIds);
    }
}