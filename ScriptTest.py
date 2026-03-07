import math
import random

plan = ["PostPaid", "PrePaid"]
phone = [33075330, 55678989, 30897765]
agent = ["agent_001", "agent_002", "agent_003"]
call_chanel = ["Inbound", "Outbound"]

planv = random.randint(0, len(plan))
phonev = random.randint(0, len(phone))
agentv = random.randint(0, len(agent))
call_chanelv = random.randint(0, len(call_chanel))
print(plan[planv], phone[phonev], agent[agentv], call_chanel[call_chanelv])