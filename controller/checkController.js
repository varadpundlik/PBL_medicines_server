const medicines=require('../model/medicalSchema')


exports.checkAvailability=async (req,res)=>{
    try{
        var checked=true;
        
    
        const presc=new prescription({                                 //add prescription to database
            name:req.body.name,
            doctor:req.body.doctor,
            email:req.body.email,
            med:req.body.med
        });
        presc.save()

        for(i=0;i<presc.med.length;i++){
            const item=presc.med[i];
            const filter={name:item.name};
            let medItem=await medicines.findOne(filter);
            if(medItem.quantity<=item.quantity){
                checked=false;
                break;
            }
        }
        console.log(checked)
        return res.status(200).json({
            availability:checked
        });

    }catch(err){
        return res.status(400).json(err.message)
    }
}